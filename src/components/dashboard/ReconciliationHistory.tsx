import { useState, useEffect } from 'react';
import { ReconciliationHistoryTable } from './ReconciliationHistoryTable';
import { ReconciliationHistoryCard } from './ReconcilaitionHistoryCard';
interface ReconciliationHistoryProps {
    fromDate?: Date;
    toDate?: Date;
    isFilterApplied: boolean;
  } 
export default function ReconciliationHistory({fromDate, isFilterApplied, toDate}: ReconciliationHistoryProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 620);
    };
    
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <ReconciliationHistoryTable fromDate={fromDate}
  toDate={toDate}
  isFilterApplied={isFilterApplied}/> : <ReconciliationHistoryCard fromDate={fromDate}
  toDate={toDate}
  isFilterApplied={isFilterApplied}/>;
}