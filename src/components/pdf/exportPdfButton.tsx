"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { DidacticPDF } from "./didacticPdf"
import { GeminiResponse } from "@/types/gemini-response"
import { Button } from "@/components/ui/button"

type ExportPDFButtonProps = {
  topic: string
  data: GeminiResponse
}

export function ExportPDFButton({ topic, data }: ExportPDFButtonProps) {
  return (
    <PDFDownloadLink
      document={<DidacticPDF topic={topic} data={data} />}
      fileName={`${topic.toLowerCase().replace(/\s+/g, "-")}.pdf`}
    >
      {({ loading }) => (
        <Button className="mt-4" disabled={loading}>
          {loading ? "Gerando PDF..." : "Exportar como PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
