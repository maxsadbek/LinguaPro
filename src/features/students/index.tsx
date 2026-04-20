import React, { useEffect, useRef, useState } from 'react'
import { Edit, Eye, Plus, Search, Trash2, User, X } from 'lucide-react'
import { SearchProvider } from '@/context/search-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { DeleteModal } from './components/DeleteModal'
import { DetailModal } from './components/DetailModal'
import { EditModal } from './components/EditModal'

export interface Student {
  id: number
  fullName: string
  phone: string
  group: string
  paymentStatus: 'paid' | 'pending' | 'overdue'
  status: 'active' | 'inactive'
  avatar: string | null
}

const getInitialStudentsData = (): Student[] => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('studentsData')
    if (savedData) {
      return JSON.parse(savedData)
    }
  }

  const defaultData: Student[] = [
    {
      id: 1,
      fullName: 'Karimov Ali',
      phone: '+998 90 123 45 67',
      group: 'Advanced-1',
      paymentStatus: 'paid',
      status: 'active',
      avatar: null,
    },
    {
      id: 2,
      fullName: 'Saidova Malika',
      phone: '+998 91 234 56 78',
      group: 'Intermediate-2',
      paymentStatus: 'pending',
      status: 'active',
      avatar: null,
    },
    {
      id: 3,
      fullName: 'Toshmatov Bobur',
      phone: '+998 93 345 67 89',
      group: 'Beginner-1',
      paymentStatus: 'overdue',
      status: 'inactive',
      avatar: null,
    },
    {
      id: 4,
      fullName: 'Karimova Nodira',
      phone: '+998 94 456 78 90',
      group: 'Advanced-2',
      paymentStatus: 'paid',
      status: 'active',
      avatar: null,
    },
    {
      id: 5,
      fullName: 'Azimov Jasur',
      phone: '+998 99 567 89 01',
      group: 'Intermediate-1',
      paymentStatus: 'pending',
      status: 'active',
      avatar: null,
    },
  ]

  if (typeof window !== 'undefined') {
    localStorage.setItem('studentsData', JSON.stringify(defaultData))
  }

  return defaultData
}

const paymentStatusColors = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  overdue: 'bg-red-100 text-red-800',
}

const statusColors = {
  active: 'bg-blue-100 text-blue-800',
  inactive: 'bg-gray-100 text-gray-800',
  overdue: 'bg-red-100 text-red-800',
}

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [studentsData, setStudentsData] = useState<Student[]>(() =>
    getInitialStudentsData()
  )
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    level: '',
    status: true,
    paymentStatus: '',
    avatar: null as File | null,
  })
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const { addToast, ToastContainer } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Image preview modal state
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  // Action modals state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && studentsData.length > 0) {
      localStorage.setItem('studentsData', JSON.stringify(studentsData))
    }
  }, [studentsData])

  const handleInputChange = (
    field: string,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value

  // +998 ni o'chirmaslik
  if (!value.startsWith('+998')) {
    value = '+998'
  }

  // Faqat raqamlarga ruxsat (+998 dan keyin)
  const digits = value.slice(4).replace(/\D/g, '')

  // Format: +998 XX XXX XX XX
  let formatted = '+998'
  if (digits.length > 0) formatted += ' ' + digits.slice(0, 2)
  if (digits.length > 2) formatted += ' ' + digits.slice(2, 5)
  if (digits.length > 5) formatted += ' ' + digits.slice(5, 7)
  if (digits.length > 7) formatted += ' ' + digits.slice(7, 9)

  setFormData((prev) => ({ ...prev, phone: formatted }))
}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingStudent) {
      // Update existing student
      const updatedStudent = {
        ...editingStudent,
        fullName: `${formData.name} ${formData.surname}`,
        phone: formData.phone,
        group: formData.level || editingStudent.group,
        paymentStatus:
          (formData.paymentStatus as 'paid' | 'pending' | 'overdue') ||
          editingStudent.paymentStatus,
        status: (formData.status ? 'active' : 'inactive') as
          | 'active'
          | 'inactive',
        avatar: avatarPreview || editingStudent.avatar,
      }

      setStudentsData((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? updatedStudent : s))
      )

      // Show success toast
      addToast(
        `${editingStudent.fullName} muvaffaqiyatli yangilandi!`,
        'success'
      )

      // Close edit modal
      setIsEditModalOpen(false)
      setEditingStudent(null)

      // Reset form
      setFormData({
        name: '',
        surname: '',
        phone: '',
        level: '',
        status: true,
        paymentStatus: '',
        avatar: null,
      })
      setAvatarPreview('')
    } else {
      // Add new student
      const newStudent = {
        id: studentsData.length + 1,
        fullName: `${formData.name} ${formData.surname}`,
        phone: formData.phone,
        group: formData.level || 'Belgilanmagan',
        paymentStatus:
          (formData.paymentStatus as 'paid' | 'pending' | 'overdue') ||
          'pending',
        status: (formData.status ? 'active' : 'inactive') as
          | 'active'
          | 'inactive',
        avatar: avatarPreview || null,
      }

      setStudentsData((prev) => [newStudent, ...prev])

      // Show success toast
      addToast(
        `${formData.name} ${formData.surname} muvaffaqiyatli qo'shildi!`,
        'success'
      )

      // Reset form and close add modal
      setFormData({
        name: '',
        surname: '',
        phone: '',
        level: '',
        status: true,
        paymentStatus: '',
        avatar: null,
      })
      setAvatarPreview('')
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      surname: '',
      phone: '',
      level: '',
      status: true,
      paymentStatus: '',
      avatar: null,
    })
    setAvatarPreview('')
    setIsModalOpen(false)
  }

  // Reset form function
  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      phone: '',
      level: '',
      status: true,
      paymentStatus: '',
      avatar: null,
    })
    setAvatarPreview('')
  }

  const handleAvatarPreview = (imageUrl: string) => {
    setPreviewImage(imageUrl)
    setIsPreviewModalOpen(true)
  }

  const closePreviewModal = () => {
    setPreviewImage(null)
    setIsPreviewModalOpen(false)
  }

  // Action handlers
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setIsEditModalOpen(true)

    // Populate form with student data
    const [name, surname] = student.fullName.split(' ', 2)
    setFormData({
      name: name || '',
      surname: surname || '',
      phone: student.phone,
      level: student.group,
      status: student.status === 'active',
      paymentStatus: student.paymentStatus,
      avatar: null,
    })
    setAvatarPreview(student.avatar || '')
  }

  const handleDeleteStudent = (student: Student) => {
    setDeletingStudent(student)
    setIsDeleteModalOpen(true)
  }

  const handleViewStudent = (student: Student) => {
    setViewingStudent(student)
    setIsDetailModalOpen(true)
  }

  const confirmDelete = () => {
    if (deletingStudent) {
      setStudentsData((prev) => prev.filter((s) => s.id !== deletingStudent.id))
      addToast(`${deletingStudent.fullName} o'chirildi`, 'success')
      setIsDeleteModalOpen(false)
      setDeletingStudent(null)
    }
  }

  return (
    <SearchProvider>
      <div className='min-h-screen bg-[#F8FAFC] dark:bg-[#020617]'>
        <Header>
          <Search className='me-auto' />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </Header>

        <Main>
          <div className='mb-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>
                  O'quvchilar Ro'yxati
                </h1>
                <p className='mt-1 text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Barcha o'quvchilar ma'lumotlari va to'lov holati
                </p>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    className='rounded-2xl bg-[#C00639] shadow-sm shadow-[#C00639] hover:bg-red-700 dark:border dark:border-[#A01521] dark:bg-transparent dark:text-white dark:hover:border-[#A01521]'
                    onClick={() => {
                      resetForm()
                      setEditingStudent(null)
                    }}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    O'quvchi qo'shish
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-125'>
                  <DialogHeader>
                    <DialogTitle className='text-xl font-semibold'>
                      O'quvchi qo'shish
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center py-6'
                  >
                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      className='hidden'
                    />

                    {/* Avatar Section */}
                    <div className='mb-6 flex flex-col items-center'>
                      <div
                        className='relative mb-3 cursor-pointer'
                        onClick={handleAvatarClick}
                      >
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt='Avatar'
                            className='h-20 w-20 rounded-full border-2 border-gray-300 object-cover'
                          />
                        ) : (
                          <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-100'>
                            <Plus className='h-8 w-8 text-gray-400' />
                          </div>
                        )}
                        <div className='absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#C00639]'>
                          <Plus className='h-3 w-3 text-white' />
                        </div>
                      </div>
                      <p className='text-sm text-gray-500'>Rasm yuklash</p>
                    </div>

                    {/* Form Fields */}
                    <div className='mb-4 grid w-full grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name' className='text-sm font-medium'>
                          Ism
                        </Label>
                        <Input
                          id='name'
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange('name', e.target.value)
                          }
                          placeholder='Ismni kiriting'
                          className='h-10'
                          required
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label
                          htmlFor='surname'
                          className='text-sm font-medium'
                        >
                          Familiya
                        </Label>
                        <Input
                          id='surname'
                          value={formData.surname}
                          onChange={(e) =>
                            handleInputChange('surname', e.target.value)
                          }
                          placeholder='Familiyani kiriting'
                          className='h-10'
                          required
                        />
                      </div>
                    </div>

                    <div className='mb-4 w-full space-y-2'>
                      <Label htmlFor='phone' className='text-sm font-medium'>
                        Telefon raqami
                      </Label>
                      <Input
                        id='phone'
                        value={formData.phone || '+998'}
                        onChange={handlePhoneChange}
                        placeholder='+998 XX XXX XX XX'
                        className='h-10'
                        required
                      />
                    </div>

                    <div className='mb-4 w-full space-y-2'>
                      <Label htmlFor='level' className='text-sm font-medium'>
                        Daraja
                      </Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) =>
                          handleInputChange('level', value)
                        }
                      >
                        <SelectTrigger className='h-10'>
                          <SelectValue placeholder='Darajani tanlang' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='beginner'>Beginner</SelectItem>
                          <SelectItem value='intermediate'>
                            Intermediate
                          </SelectItem>
                          <SelectItem value='advanced'>Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='mb-6 grid w-full grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='status' className='text-sm font-medium'>
                          Holati
                        </Label>
                        <div className='flex h-10 items-center space-x-2'>
                          <Switch
                            id='status'
                            checked={formData.status}
                            onCheckedChange={(checked) =>
                              handleInputChange('status', checked)
                            }
                          />
                          <Label
                            htmlFor='status'
                            className='text-sm text-gray-600'
                          >
                            Faol
                          </Label>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label
                          htmlFor='payment-status'
                          className='text-sm font-medium'
                        >
                          To'lov holati
                        </Label>
                        <Select
                          value={formData.paymentStatus}
                          onValueChange={(value) =>
                            handleInputChange('paymentStatus', value)
                          }
                        >
                          <SelectTrigger className='h-10'>
                            <SelectValue placeholder="To'lov holatini tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='paid'>To'langan</SelectItem>
                            <SelectItem value='pending'>Kutilmoqda</SelectItem>
                            <SelectItem value='overdue'>Qarzdor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex w-full justify-end space-x-3 border-t pt-4'>
                      <Button
                        type='button'
                        variant='outline'
                        className='px-6 py-2'
                        onClick={handleCancel}
                      >
                        Bekor qilish
                      </Button>
                      <Button
                        type='submit'
                        className='bg-[#C00639] px-6 py-2 hover:bg-red-700'
                      >
                        Saqlash
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Yangi
                </CardTitle>
                <div className='h-8 w-8 rounded-full bg-blue-100 p-2'>
                  <Plus className='h-4 w-4 text-blue-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  12
                </div>
                <p className='text-xs text-gray-500'>Bu oy qo'shilgan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  To'lagan
                </CardTitle>
                <div className='h-8 w-8 rounded-full bg-green-100 p-2'>
                  <Plus className='h-4 w-4 text-green-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  234
                </div>
                <p className='text-xs text-gray-500'>To'lov qilgan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Qarzdorlar
                </CardTitle>
                <div className='h-8 w-8 rounded-full bg-red-100 p-2'>
                  <Plus className='h-4 w-4 text-red-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  8
                </div>
                <p className='text-xs text-gray-500'>Qarzdor o'quvchilar</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  O'sish
                </CardTitle>
                <div className='h-8 w-8 rounded-full bg-purple-100 p-2'>
                  <Plus className='h-4 w-4 text-purple-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  +15%
                </div>
                <p className='text-xs text-gray-500'>O'tgan oyga nisbatan</p>
              </CardContent>
            </Card>
          </div>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>O'quvchilar jadvali</CardTitle>
              <CardDescription>
                Jami {studentsData.length} ta o'quvchi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-12'></TableHead>
                    <TableHead>F.I.SH.</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Guruh</TableHead>
                    <TableHead>To'lov holati</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className='font-medium'>
                        <Avatar
                          className='h-8 w-8 cursor-pointer transition-opacity hover:opacity-80'
                          onClick={() =>
                            student.avatar &&
                            handleAvatarPreview(student.avatar)
                          }
                        >
                          <AvatarImage src={student.avatar || undefined} />
                          <AvatarFallback className='bg-gray-100 text-gray-600'>
                            <User className='h-4 w-4' />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className='font-medium'>
                        {student.fullName}
                      </TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.group}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            paymentStatusColors[
                              student.paymentStatus as keyof typeof paymentStatusColors
                            ]
                          }
                        >
                          {student.paymentStatus === 'paid' && "To'langan"}
                          {student.paymentStatus === 'pending' && 'Kutilmoqda'}
                          {student.paymentStatus === 'overdue' && 'Qarzdor'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[
                              student.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {student.status === 'active' ? 'Faol' : 'Faol emas'}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end space-x-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleViewStudent(student)}
                            className='hover:bg-blue-50 hover:text-blue-600'
                            title='Ko&#39;rish'
                          >
                            <Eye className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleEditStudent(student)}
                            className='hover:bg-green-50 hover:text-green-600'
                            title='Tahrirlash'
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDeleteStudent(student)}
                            className='text-red-600 hover:bg-red-50 hover:text-red-700'
                            title='O&#39;chirish'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className='mt-6 flex items-center justify-between'>
            <div className='text-sm text-gray-700'>
              1-{studentsData.length} dan {studentsData.length} ta
              ko'rsatilmoqda
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' size='sm' disabled>
                Oldingi
              </Button>
              <Button variant='outline' size='sm'>
                1
              </Button>
              <Button variant='outline' size='sm' disabled>
                Keyingi
              </Button>
            </div>
          </div>
        </Main>
        <ToastContainer />

        {/* Image Preview Modal */}
        <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
          <DialogContent className='max-h-[90vh] max-w-4xl p-0'>
            <div className='relative'>
              <button
                onClick={closePreviewModal}
                className='absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
              >
                <X className='h-4 w-4' />
              </button>
              {previewImage && (
                <img
                  src={previewImage}
                  alt='Avatar preview'
                  className='h-full max-h-[85vh] w-full object-contain'
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {deletingStudent && (
          <DeleteModal
            student={deletingStudent}
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}

        {viewingStudent && (
          <DetailModal
            student={viewingStudent}
            isOpen={isDetailModalOpen}
            onOpenChange={setIsDetailModalOpen}
          />
        )}

        {editingStudent && (
          <EditModal
            student={editingStudent}
            isOpen={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            onCancel={() => {
              setIsEditModalOpen(false)
              setEditingStudent(null)
            }}
          />
        )}
      </div>
    </SearchProvider>
  )
}
