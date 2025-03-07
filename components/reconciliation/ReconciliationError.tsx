import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ReconciliationErrorModal = () => {
  return (
    <Dialog open>
      <DialogTitle className="text-[#0F172A] font-semibold text-lg md:text-xl text-center">
            Processing Reconciliation
      </DialogTitle>
      <DialogContent className="max-w-[535px] p-8">
        <div className="flex flex-col items-center justify-between gap-6">
          <h2 className="font-bold text-3xl md:text-5xl">Oops!</h2>
          <Image
            src="/Sad.png"
            width={100}
            height={100}
            alt="Error icon"
            className="object-cover"
          />
          <p className="text-[#475569]">CSV Table Structure not currently supported!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReconciliationErrorModal;
