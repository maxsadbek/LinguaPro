import { useEffect, useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2, Save, Camera } from 'lucide-react'
import { useProfile } from '@/hooks/teacher/profile/useProfile'
import { useUpdateProfile } from '@/hooks/teacher/profile/useUpdateProfile'
import { Input } from '@/components/ui/input'
import { RoseButton } from '@/components/ui/rose-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute(
  '/_authenticated/teacher-dashboard/profile'
)({
  component: ProfilePage,
})

type ProfileForm = {
  username: string
  avatar: string
  timezone: string
  bio: string
  learning_goal: string
}

const TIMEZONES = [
  'Asia/Tashkent',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
]

const inputClassName =
  'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-600/15 disabled:bg-gray-50 disabled:text-gray-500'

function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile()
  const updateProfileMutation = useUpdateProfile()

  // Rasm yuklash va preview uchun state'lar
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm<ProfileForm>({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username || '',
        avatar: profile.avatar || '',
        timezone: profile.timezone || 'Asia/Tashkent',
        bio: profile.bio || '',
        learning_goal: profile.learning_goal || '',
      })
      if (profile.avatar) {
        setPreviewUrl(profile.avatar)
      }
    }
  }, [profile, reset])

  // Kompyuterdan rasm tanlanganda ishlaydigan funksiya
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Ekranda ko'rsatish uchun vaqtinchalik local URL yaratamiz
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Cloudinary'ga rasmni yuklash funksiyasi
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    // DIQQAT: O'zingizning Cloudinary ma'lumotlaringizni shu yerga yozing
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET') 
    
    // API manzilidagi YOUR_CLOUD_NAME ni ham o'zgartirishni unutmang
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
    
    if (!response.ok) throw new Error('Rasm yuklashda xatolik yuz berdi')
    
    const data = await response.json()
    return data.secure_url // Cloudinary qaytargan tayyor HTTP link
  }

  const onSubmit = async (data: ProfileForm) => {
    let finalAvatarUrl = data.avatar

    // Agar yangi rasm tanlangan bo'lsa, avval uni Cloudinary'ga yuklaymiz
    if (selectedFile) {
      setIsUploading(true)
      try {
        finalAvatarUrl = await uploadToCloudinary(selectedFile)
        setValue('avatar', finalAvatarUrl, { shouldDirty: true })
      } catch (error) {
        console.error(error)
        setIsUploading(false)
        return // Xato bo'lsa formani yubormaymiz
      }
      setIsUploading(false)
    }

    // Cloudinary'dan kelgan link (yoki eskisi) bilan API'ga ma'lumot jo'natamiz
    updateProfileMutation.mutate({
      ...data,
      avatar: finalAvatarUrl,
    })
  }

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center text-rose-500'>
        <Loader2 className='animate-spin' size={32} />
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className='rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-sm text-rose-700'>
        Failed to load profile. Please try again later.
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>Profile</h1>
        <p className='mt-1 text-sm text-gray-500 md:text-base'>
          Manage your account settings and information
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {/* Left Column: Avatar & Role */}
        <div className='col-span-1 lg:col-span-3'>
          <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
            <div className='flex flex-col items-center text-center'>
              
              {/* Rasm tanlash UI qismi */}
              <div className='group relative mb-4 h-28 w-28'>
                <div className='h-full w-full overflow-hidden rounded-full ring-4 ring-rose-50'>
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt='Profile'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center bg-rose-500 text-4xl font-bold text-white'>
                      {profile.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                
                {/* Rasm ustiga hover qilganda chiqadigan "Camera" knopkasi */}
                <label className='absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white bg-rose-500 text-white shadow-sm transition hover:bg-rose-600'>
                  <Camera size={16} />
                  <input
                    type='file'
                    className='hidden'
                    accept='image/jpeg, image/png, image/webp'
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <h2 className='text-lg font-bold text-gray-900'>{profile.username}</h2>
              <span className='mt-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700'>
                Teacher
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className='col-span-1 lg:col-span-9'>
          <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8'>
            <h3 className='mb-6 text-lg font-bold text-gray-900 sm:text-xl'>
              Personal Information
            </h3>
            <form
              id='profile-form'
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Username
                  </label>
                  <Input
                    {...register('username', { required: 'Username is required' })}
                    placeholder='Enter your username'
                    className='h-11'
                  />
                  {errors.username && (
                    <p className='mt-1 text-xs text-red-500'>{errors.username.message}</p>
                  )}
                </div>

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Timezone
                  </label>
                  <Select
                    value={profile?.timezone || 'Asia/Tashkent'}
                    onValueChange={(value) => setValue('timezone', value, { shouldDirty: true })}
                  >
                    <SelectTrigger className='h-11 w-full'>
                      <SelectValue placeholder='Select timezone' />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>Bio</label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  placeholder='Tell us about yourself...'
                  className={`${inputClassName} resize-none`}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Learning Goal
                </label>
                <textarea
                  {...register('learning_goal')}
                  rows={3}
                  placeholder='What are your teaching goals?'
                  className={`${inputClassName} resize-none`}
                />
              </div>

              <div className='flex justify-end pt-4'>
                <RoseButton
                  type='submit'
                  form='profile-form'
                  disabled={
                    (!isDirty && !selectedFile) || 
                    updateProfileMutation.isPending || 
                    isUploading
                  }
                  className='px-6 py-2.5'
                >
                  {updateProfileMutation.isPending || isUploading ? (
                    <div className='flex items-center gap-2'>
                      <Loader2 size={18} className='animate-spin' />
                      {isUploading ? 'Uploading Image...' : 'Saving...'}
                    </div>
                  ) : (
                    <>
                      <Save size={18} className='mr-2' />
                      Save Changes
                    </>
                  )}
                </RoseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}