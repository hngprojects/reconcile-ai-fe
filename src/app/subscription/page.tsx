import { ArrowLeft } from "lucide-react"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from "@/src/components/ui/table";
import Link from "next/link"
import { CheckCircle2Icon } from "lucide-react";
import { Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { StickyNote, ArrowDown, CloudDownload } from "lucide-react";
import Container from "@/src/components/Container";
import Footer from "@/src/components/Footer";


export default function BillingPage(){
    const planFeatures = [
        "Reconcile up to 20 transactions/month",
        "Basic AI matching (date, amount, description)",
        "Export results to CSV",
        "Manual adjustments (unlink and match errors)",
    ];

    const invoices = [
        { id: "007", month: "Dec 2022", date: "Dec 1, 2022", status: "Paid", amount: "USD $10.00", plan: "Starter Plan" },
        { id: "006", month: "Nov 2022", date: "Nov 1, 2022", status: "Paid", amount: "USD $10.00", plan: "Starter Plan" },
        { id: "005", month: "Oct 2022", date: "Oct 1, 2022", status: "Paid", amount: "USD $10.00", plan: "Starter Plan" },
        { id: "004", month: "Sep 2022", date: "Sep 1, 2022", status: "Paid", amount: "USD $10.00", plan: "Starter Plan" },
      ];
    
    return (
        <div>
            <Container className="font-inter my-5">
                <div className="flex items-center gap-2">
                    <ArrowLeft />
                    <p>Go Back</p>
                </div>
                <div className="mt-3 px-8 text-[#333333] py-4 border-b-1 border-solid border-[#EAECF0]">
                    <h2 className="font-bold text-base sm:text-3xl">Billing</h2>
                    <p>Manage your billing and payment details.</p>
                </div>
    
                <div className="pl-8 flex flex-col md:items-end justify-between md:flex-row gap-4 py-7 border-b-1 border-solid border-[#EAECF0]">
                    <div className="flex flex-col gap-7">
                        <div>
                            <h3 className="text[#101828] font-bold">Current Plan</h3>
                            <p className="text[#475467]">Manage your subscription plan</p>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-[#101828] font-bold">Starter plan</h3>
                                    <p className="text-[#2A5743] bg-[#EAEFED] rounded-lg px-2 py-0.5 text-sm">Current</p>
                                </div>
                                <div>
                                    <p className="text-[#475467]">Our most popular plan for start-ups.</p>
                                </div>
                            </div>
                            <div>
                                <p><span className="text-[#101828] text-2xl sm:text-2xl md:3xl font-bold">$10</span>per month</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-7">
                        <Link
                            href="/file-upload"
                            aria-label="Start Reconciliation"
                            className="border-1 border-solid border-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full  md:w-40 text-sm text-[#297B65] hover:bg-[#333333] hover:text-white flex cursor-pointer mr-auto"
                        >
                            Cancel Plan
                        </Link>
                        <Link
                        href="/subscription/upgrade-plan"
                        aria-label="Start Reconciliation"
                        className="bg-[#297B65] py-2 px-4 rounded-md font-semibold justify-center items-center h-12 w-full md:w-40 text-sm text-white hover:bg-[#297B65]/90 flex cursor-pointer mr-auto"
                        >
                            Upgrade Plan
                        </Link>
                    </div>
                </div>
    
                <div className="px-8 py-4 border-b-1 border-solid border-[#EAECF0]">
                    <h3>Plan Features</h3>
                    {planFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center text-[#333333] my-4 gap-3">
                            <CheckCircle2Icon className="h-6 w-6"/>
                            <p className="text-sm sm:text-base">{feature}</p>
                        </div>
                    ))}
                </div>
    
    
                <div className="pl-8 py-4 border-b-1 border-solid items-center border-[#EAECF0] flex flex-row justify-between"> 
                    <div>
                        <h2 className="text-[#101828] font-bold">Next Billing Date</h2>
                        <p>april 05 2025</p>
                    </div>
                    <p className="text-[#101828] font-bold text-base sm:text-3xl">$10</p>
                </div>
    
                <div>
                    <div className="pl-8 flex flex-col sm:flex-row justify-between sm:items-center w-full pb-4 pt-10 gap-5 sm:gap-0">
                        <div>
                            <h2>Billing and invoice</h2>
                            <p>Pick an account type that fits your workflow</p>
                        </div>
                        <div>
    
                            <button
                                aria-label="Start Reconciliation"
                                className="bg-[white] border-1 border-dashed border-[#D0D5DD] gap-2 items-center py-2 px-4 rounded-md font-semibold justify-center h-12 w-full md:w-40 text-sm text-[#344054] hover:bg-[#297B65]/90 hover:text-[white] flex cursor-pointer mr-auto"
                                >
                                    <CloudDownload/>
                                    Download all
                            </button>
                        </div>
                    </div>
    
    
                    <div className="w-full pl-8 mt-6">
                        <Table className="border-1 border-solid border-[#EAECF0] rounded-xl overflow-hidden">
                            <TableHeader>
                            <TableRow className="bg-[#EAECF0]">
                                <TableHead>Invoice</TableHead>
                                <TableHead className="flex items-center gap-1">
                                    Billing date
                                    <ArrowDown className="w-4 h-4"/>
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                <TableCell className="flex items-center space-x-2">
                                    <StickyNote className="text-[#2E604A] w-8 h-8 rounded-full p-2 bg-[#EAEFED]" />
                                    <span className="text-[#101828]">Invoice #{invoice.id} – {invoice.month}</span>
                                </TableCell>
                                <TableCell>
                                    {invoice.date}
                                </TableCell>
                                <TableCell className="w-fit">
                                    <span className="py-1 px-2 text-green-700 bg-green-100 rounded-md flex gap-1 items-center w-fit">
                                        <Check className='w-3 h-3'/>
                                        {invoice.status}
                                    </span>
                                </TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>{invoice.plan}</TableCell>
                                <TableCell>
                                    <Button variant="link" className="text-[#2E604A] cursor-pointer">Download</Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}