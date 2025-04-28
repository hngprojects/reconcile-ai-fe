import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
});

type CreateProjectValues = z.infer<typeof CreateProjectSchema>;

export default function CreateModal({
    open,
    onClose,
    onCreate,
}: {
    open: boolean
    onClose: () => void
    onCreate: (data: any) => void
}) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<CreateProjectValues>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            title: ""
        },
    })

    const onSubmit = (data: any) => {
        startTransition(() => {
            onCreate(data)
            form.reset()
            onClose()
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Reconciliation Project</DialogTitle>
                    <DialogDescription>
                        Set up a new reconciliation project to match multiple bank accounts to your ledgers
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col space-y-2">
                                            <Label htmlFor="title">Project Name</Label>
                                            <Input
                                                {...field}
                                                id="title"
                                                placeholder="Q1 2025 Reconciliation"
                                                className="!h-12 w-full placeholder:text-sm"
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-8 flex justify-between gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 sm:w-[137px] sm:flex-none"
                                onClick={onClose}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="flex-1 p-3 sm:w-[137px] sm:flex-none"
                                disabled={form.formState.isSubmitting || isPending}
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : 'Create Project'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
//
// import { useForm } from 'react-hook-form'