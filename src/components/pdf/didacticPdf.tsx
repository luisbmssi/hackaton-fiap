import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { GeminiResponse } from "@/types/gemini-response"

type DidacticPDFProps = {
  topic: string
  data: GeminiResponse
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
  },
  listItem: {
    marginBottom: 4,
  },
})

export function DidacticPDF({ topic, data }: DidacticPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Tema</Text>
          <Text>{topic}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Explicação</Text>
          <Text>{data.explanation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Resumo</Text>
          <Text>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Questões de Múltipla Escolha</Text>
          {data.questions.map((q, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text>{`${i + 1}. ${q.question}`}</Text>
              {q.options.map((opt, idx) => (
                <Text key={idx}>
                  {String.fromCharCode(97 + idx)}) {opt}
                </Text>
              ))}
              <Text>Gabarito: {q.answer.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Exercícios Dissertativos</Text>
          {data.essays.map((e, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text>{`${i + 1}. ${e.question}`}</Text>
              <Text>Gabarito: {e.answer}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
