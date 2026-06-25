export function exportInquiriesToCSV(inquiries) {
  const headers = ['Inquiry ID', 'Product Name', 'Product ID', 'Timestamp', 'User Device Info'];
  
  const rows = inquiries.map(item => {
    const formattedDate = item.timestamp?.seconds 
      ? new Date(item.timestamp.seconds * 1000).toLocaleString('en-IN')
      : 'N/A';
      
    return [
      item.id,
      `"${item.productName.replace(/"/g, '""')}"`,
      item.productId,
      formattedDate,
      `"${(item.userAgent || '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `bonita_inquiries_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
