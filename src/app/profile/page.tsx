"use client";
import { useState, useEffect } from "react"; // eslint-disable-line
import { useAuth } from "@/src/components/context/AuthContext";
import Image from "next/image";
import { Button } from "@/src/components/ui/button"; // eslint-disable-line
import { Input } from "@/src/components/ui/input";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import Container from "@/src/components/Container";
import circleAlertIcon from "@/public/assets/images/circleAlertIcon.svg";
import { toast } from "sonner";
import { updateProfile } from "@/src/lib/api";

export default function ProfileManagement() {
  const { user, setUser, deleteUserDetails } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = (field: string) => {
    setEditingField(field);
    setEditedValue(user[field as keyof typeof user]);
  };
  const getUserInitials = (name?: string) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0].toUpperCase()).join("");
    return initials;
  };

  const handleSave = async () => {
    if (!editingField) return;

    try {
      const result = await updateProfile({
        [editingField]: editedValue,
      });

      if (result.success) {
        setUser((prev) => ({
          ...prev,
          [editingField]: editedValue,
        }));
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile");
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const renderField = (label: string, value: string, field: string) => {
    const editable = field === "city" || field === "country";

    if (!editable) {
      return (
        <div className="border-b border-[#E4E7EC]">
          <div className="text-[#101828] h-[19px] text-[16px] font-medium leading-[100%] tracking-[0%]">
            {label}
          </div>
          <div className="text-[#101828] pt-[10px] pb-[10px] pr-[10px] text-[16px] font-light leading-[100%] tracking-[0%]">
            {value}
          </div>
        </div>
      );
    }

    if (editingField === field) {
      return (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#101828] text-[16px] font-semibold">
              {label}
            </span>
            <button
              onClick={handleCancel}
              className="text-[#E63946] text-[16px] leading-[100%] tracking-[0%] cursor-pointer font-medium"
            >
              Cancel
            </button>
          </div>
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="mb-4 border-[#DEDEDE] py-[12px] px-[16px] text-[20px] font-normal font-inter focus:border-[#DEDEDE] focus:ring-[#12B76A]/30 color-[#333333]"
          />
          <button
            type="button"
            className="h-[50px] w-[160px] nowrap py-[8px] px-[20px] bg-[#2E604A] text-white rounded-[12px] font-inter font-semibold text-[14px] leading-[28px] tracking-[0%] hover:bg-[#2E604A]/90 cursor-pointer"
            aria-label="Save changes"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      );
    }

    return (
      <div className="mb-4 border-b border-[#E4E7EC]">
        <div className="flex justify-between items-center pr-[10px]">
          <span className="text-[#101828] text-[16px] font-medium leading-[100%] tracking-[0%]">
            {label}
          </span>
          <button
            onClick={() => handleEditClick(field)}
            className="text-[14px] text-[#2E604A] font-medium leading-[100%] tracking-[0%] cursor-pointer"
          >
            Edit
          </button>
        </div>
        <div className="text-[#101828] pt-[10px] pb-[10px] pr-[10px] text-[16px] font-light leading-[100%] tracking-[0%]">
          {value}
        </div>
      </div>
    );
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserDetails();
      toast.success("Your account has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    }
  };
  return (
    <>
      <section className="bg-[#F8F8F8] min-h-screen flex justify-center items-center p-4">
        <Container className="max-w-2xl w-full bg-white rounded-[24px] p-4 md:p-[40px]">
          <div className="flex flex-col mb-6">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-4">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user?.name || "User"}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white font-medium rounded-full">
                  {getUserInitials(user?.name)}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[#101828] font-medium text-[24px] leading-[100%] tracking-[0%]">
                {user?.name}
              </div>
              <div className="text-[#475467] text-[16px] leading-[24px]">
                {user?.email}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[#101828] font-medium text-[24px] leading-[100%] tracking-[0%] mb-4">
                Personal Info
              </div>

              <div className="flex flex-col gap-[24px]">
                {renderField("Name", user?.name || "", "name")}
                {renderField("Email", user?.email || "", "email")}
                {renderField("City", user?.city || "", "city")}
                {renderField("Country", user?.country || "", "country")}
              </div>
            </div>

            <div>
              <div className="text-[#101828] text-[24px] font-medium mb-4 leading-[100%] tracking-[0%]">
                Manage Account
              </div>
              <div className="">
                <div className="flex flex-col gap-2">
                  <div className="text-[#101828] text-[16px] font-medium leading-[100%] tracking-[0%]">
                    Delete Account
                  </div>

                  <div className="flex justify-between">
                    <p className="text-[#101828] font-light text-[14px] leading-[100%] tracking-[0%]">
                      Permanently delete your account
                    </p>
                    <button
                      className="text-[#E63946] font-medium text-[16px] cursor-pointer tracking-[0%] leading-[100%]"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Delete Account Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="w-[90%] max-w-[480px] rounded-[14px] p-0 border-none"
          closeButton={false}
        >
          <div className="flex flex-col gap-[32px] pb-[20px] px-6 ">
            <div className="flex justify-center">
              <Image src={circleAlertIcon} alt="Circle Alert Icon" />
            </div>
            <div>
              <h2 className="text-[20px] font-medium leading-[150%] tracking-[0%] text-[#333333]">
                Are you sure want to permanently delete your account?
              </h2>
              <p className="text-[#5A5A5A] font-inter font-normal text-[13px] m-0 leading-[150%] tracking-[0%] p-0 ">
                By doing this, your account will be deleted permanently and you
                will no longer be able to recover your account.
              </p>
            </div>
            <div className="flex justify-between h-[42px]">
              <button
                className="w-[160px] nowrap px-[10px] text-[14px] text-[#E63946] border border-[#E63946] rounded-[8px]"
                onClick={handleDeleteAccount}
              >
                Delete account
              </button>
              <button
                className="w-[160px] px-[10px] text-[14px] bg-[#2E604A] text-white rounded-[8px]"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
