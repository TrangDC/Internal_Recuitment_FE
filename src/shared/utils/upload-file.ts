export const downloadPdf = async (pdfUrl: string) => {
  try {
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    // Tạo một thẻ <a> và kích hoạt tải xuống
    const a = document.createElement('a')
    a.href = url
    a.download = 'downloaded_file.pdf' // Tên tệp bạn muốn lưu
    document.body.appendChild(a)
    a.click()

    // Xóa thẻ <a> sau khi tải xuống
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error('Failed to download PDF:', error)
  }
}

export const downloadPdfAndOpenInNewTab = async (urlFile: string) => {
  try {
    const response = await fetch(urlFile)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  } catch (error) {
    console.error('Failed to download PDF:', error)
  }
}