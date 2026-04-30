import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2, Mail, Phone, Save } from 'lucide-react'
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
  full_name: string
  phone: string
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
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        timezone: 'Asia/Tashkent',
        bio: '',
        learning_goal: '',
      })
    }
  }, [profile, reset])

  const onSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate({
      username: data.username,
      timezone: data.timezone,
      bio: data.bio,
      learning_goal: data.learning_goal,
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

  const initialLetter = profile.full_name
    ? profile.full_name[0].toUpperCase()
    : profile.username
      ? profile.username[0].toUpperCase()
      : 'U'

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
          Profile
        </h1>
        <p className='mt-1 text-sm text-gray-500 md:text-base'>
          Manage your account settings and information
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {/* Left Column: Profile Card (3 cols on desktop) */}
        <div className='col-span-1 lg:col-span-3'>
          <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4'>
                <div className='flex h-24 w-24 items-center justify-center rounded-full bg-rose-500 text-3xl font-bold text-white ring-4 ring-rose-50'>
                  {initialLetter}
                </div>
              </div>

              <h2 className='text-lg font-bold text-gray-900'>
                {profile.full_name || profile.username}
              </h2>
              <p className='text-sm text-gray-500 capitalize'>{profile.role}</p>

              <div className='mt-3 flex gap-2'>
                <span className='rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700'>
                  Teacher
                </span>
              </div>
            </div>

            <div className='mt-6 space-y-3 border-t border-slate-100 pt-6'>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <Mail size={16} className='shrink-0 text-gray-400' />
                <span className='truncate'>{profile.username}</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <Phone size={16} className='shrink-0 text-gray-400' />
                <span className='truncate'>
                  {profile.phone || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form (9 cols on desktop) */}
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
                    Full Name
                  </label>
                  <Input
                    {...register('full_name')}
                    placeholder='Enter your full name'
                    className='h-11'
                    disabled
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Username
                  </label>
                  <Input
                    {...register('username', {
                      required: 'Username is required',
                    })}
                    placeholder='Enter your username'
                    className='h-11'
                  />
                  {errors.username && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Phone
                </label>
                <Input
                  {...register('phone')}
                  placeholder='Enter your phone number'
                  className='h-11'
                  disabled
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Timezone
                </label>
                <Select
                  value={profile ? 'Asia/Tashkent' : 'Asia/Tashkent'}
                  onValueChange={(value) =>
                    setValue('timezone', value, { shouldDirty: true })
                  }
                >
                  <SelectTrigger className='h-11 w-full'>
                    <SelectValue placeholder='Select timezone' />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Bio
                </label>
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
                  disabled={!isDirty || updateProfileMutation.isPending}
                  className='px-6 py-2.5'
                >
                  {updateProfileMutation.isPending ? (
                    <Loader2 size={18} className='animate-spin' />
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
