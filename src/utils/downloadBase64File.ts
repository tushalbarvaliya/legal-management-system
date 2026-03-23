export const downloadBase64File = (
  base64: string,
  fileName: string,
  mimeType?: string
) => {
  if (base64.startsWith("data:")) {
    const link = document.createElement("a")
    link.href = base64
    link.download = fileName
    link.click()
    return
  }

  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], {
    type: mimeType || "application/octet-stream",
  })

  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.click()

  URL.revokeObjectURL(url)
}
