'use client'
import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Container from '@/components/Container'
import { toast } from 'sonner'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { signOut, useSession } from 'next-auth/react'
import { delete_user_account, update_user_details } from '@/actions/user'

export default function ProfileManagement() {
  const { data, update } = useSession()
  const [isLoading, startUpdating] = useTransition()
  const user = data?.user
  const [isDeleting, startTransition] = useTransition()
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editedValue, setEditedValue] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeleteAccount = async () => {
    startTransition(async () => {
      await delete_user_account().then((res) => {
        if (res.success) {
          toast.success('Your account has been deleted successfully.')
          signOut({ redirectTo: '/' })
        } else {
          toast.error('Failed to delete account.')
        }
      })
    })
  }

  const handleEditClick = (field: string) => {
    if (!user) return
    setEditingField(field)
    setEditedValue(String(user[field as keyof typeof user] ?? ''))
  }

  const getUserInitials = (name?: string) => {
    if (!name) return ''
    const names = name.split(' ')
    const initials = names.map((n) => n[0].toUpperCase()).join('')
    return initials
  }

  const handleSave = async () => {
    if (!editingField) return
    startUpdating(async () => {
      const data = { [editingField]: editedValue }
      await update_user_details(data).then(async (res) => {
        if (res.success) {
          await update({
            user: {
              ...user,
              [editingField]: editedValue,
            },
          })
          toast.success('Changes Saved Successfully', {
            description: res.message,
          })
          setEditingField(null)
        } else
          toast.error('Failed to update changes', {
            description: res.message,
          })
      })
    })
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  const renderField = (label: string, value: string, field: string) => {
    const editable = field === 'city' || field === 'country'

    if (!editable) {
      return (
        <div className="border-b border-[#E4E7EC]">
          <div className="h-[19px] text-[16px] leading-[100%] font-medium tracking-[0%] text-[#101828]">
            {label}
          </div>
          <div className="pt-[10px] pr-[10px] pb-[10px] text-[16px] leading-[100%] font-light tracking-[0%] text-[#101828]">
            {value}
          </div>
        </div>
      )
    }

    if (editingField === field) {
      return (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#101828]">
              {label}
            </span>
            <button
              onClick={handleCancel}
              className="cursor-pointer text-[16px] leading-[100%] font-medium tracking-[0%] text-[#E63946]"
              aria-label="cancel changes"
            >
              Cancel
            </button>
          </div>
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="font-inter color-[#333333] mb-4 border-[#DEDEDE] px-[16px] py-[12px] text-[20px] font-normal focus:border-[#DEDEDE] focus:ring-[#12B76A]/30"
          />
          <button
            disabled={isLoading}
            type="button"
            className="nowrap font-inter h-[50px] w-[160px] cursor-pointer rounded-[12px] bg-[#2E604A] px-[20px] py-[8px] text-[14px] leading-[28px] font-semibold tracking-[0%] text-white hover:bg-[#2E604A]/90 disabled:opacity-15"
            aria-label="Save changes"
            onClick={handleSave}
          >
            {isLoading ? 'saving ....' : 'Save'}
          </button>
        </div>
      )
    }

    return (
      <div className="mb-4 border-b border-[#E4E7EC]">
        <div className="flex items-center justify-between pr-[10px]">
          <span className="text-[16px] leading-[100%] font-medium tracking-[0%] text-[#101828]">
            {label}
          </span>
          <button
            onClick={() => handleEditClick(field)}
            className="cursor-pointer text-[14px] leading-[100%] font-medium tracking-[0%] text-[#2E604A]"
            aria-label="edit input field"
          >
            Edit
          </button>
        </div>
        <div className="pt-[10px] pr-[10px] pb-[10px] text-[16px] leading-[100%] font-light tracking-[0%] text-[#101828]">
          {value}
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="min-h-[calc(100vh-var(--navbar-height,80px))] flex-grow items-center justify-center p-[25px] pt-[35px] md:flex md:bg-[#F8F8F8] md:p-4">
        <div className="flex w-full flex-col gap-[40px] md:max-w-2xl md:gap-6">
          <h1 className="font-inter h-[39px] text-[32px] leading-[100%] font-semibold tracking-[0%] text-[#101828]">
            Profile and Settings
          </h1>
          <Container className="w-full bg-transparent sm:rounded-[24px] sm:bg-white sm:p-4 md:p-[40px]">
            <div className="mb-6 flex flex-col">
              <div className="mb-4 h-[160px] w-[160px] overflow-hidden rounded-full md:h-[120px] md:w-[120px]">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user?.name || 'User'}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300 font-medium text-white">
                    {getUserInitials(user?.name)}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-[24px] leading-[100%] font-medium tracking-[0%] text-[#101828]">
                  {user?.name}
                </div>
                <div className="text-[16px] leading-[24px] text-[#475467]">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[40px]">
              <div>
                <div className="mb-4 text-[24px] leading-[100%] font-medium tracking-[0%] text-[#101828]">
                  Personal Info
                </div>

                <div className="flex flex-col gap-[24px]">
                  {renderField('Name', user?.name || '', 'name')}
                  {renderField('Email', user?.email || '', 'email')}
                  {renderField('City', user?.city || '', 'city')}
                  {renderField('Country', user?.country || '', 'country')}
                </div>
              </div>

              <div>
                <div className="mb-4 text-[24px] leading-[100%] font-medium tracking-[0%] text-[#101828]">
                  Manage Account
                </div>
                <div className="">
                  <div className="flex flex-col gap-2">
                    <div className="text-[16px] leading-[100%] font-medium tracking-[0%] text-[#101828]">
                      Delete Account
                    </div>

                    <div className="flex justify-between">
                      <p className="text-[14px] leading-[100%] font-light tracking-[0%] text-[#101828]">
                        Permanently delete your account
                      </p>
                      <button
                        className="cursor-pointer text-[16px] leading-[100%] font-medium tracking-[0%] text-[#E63946]"
                        onClick={() => setIsDeleteModalOpen(true)}
                        aria-label="delete account"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="w-[90%] max-w-[460px] rounded-[14px] border-none px-6"
          closeButton={false}
        >
          <div className="flex w-full flex-col gap-[32px] break-words">
            <div className="flex justify-center">
              <Image
                src="/assets/images/circleAlertIcon.svg"
                alt="Circle Alert Icon"
                width={40}
                height={40}
              />
            </div>
            <div className="w-full overflow-hidden break-words">
              <h2 className="text-[20px] leading-[150%] font-medium tracking-[0%] text-[#333333]">
                Are you sure you want to permanently delete your account?
              </h2>
              <p className="font-inter m-0 p-0 text-[13px] leading-[150%] font-normal tracking-[0%] text-[#5A5A5A]">
                By doing this, your account will be deleted permanently and you
                will no longer be able to recover your account.
              </p>
            </div>
            <div className="flex h-[42px] justify-between gap-[13px] md:gap-[53px]">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#E63946] px-[10px] text-[14px] text-[#E63946] disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[160px]"
              >
                Delete account
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 rounded-[8px] bg-[#2E604A] px-[10px] text-[14px] text-white disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[160px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {isDeleting && (
        <div className="fixed inset-0 z-[9999] bg-black opacity-50">
          <div className="absolute right-10 bottom-10 flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full bg-white">
            <LoadingSpinner />
            <div className="absolute top-[-5px] left-[55px] z-[999999] rounded-full bg-[#E53E3E] p-[12px]"></div>
          </div>
        </div>
      )}
    </>
  )
}
