import Container from "@/src/components/Container";
import FAQSection from "@/src/components/FAQs/FAQSection";
import Footer from "@/src/components/Footer";
import VideoFeature from "@/src/components/VideoFeature";
import Benefits from "@/src/components/finance/benefits";
import FormSection from "@/src/components/finance/formSection";
import About from "@/src/components/finance/about";
import HeroSection from "@/src/components/finance/hero";

export default function FinancePage(){

      
    return (
        <>
            <Container>
                <HeroSection/>
                <About/>
                <FormSection/>
                <Benefits/>
                <VideoFeature videoTitle='See how ReconXi does it!'/>
                <FAQSection/>
            </Container>
            <Footer/>
        </>
    );
}