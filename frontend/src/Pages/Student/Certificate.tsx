import { Document, Page, Text, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
    },
    header: {
        marginBottom: 20,
        fontSize: 24,
        textAlign: 'center',
        color: '#1e3a8a',
    },
    title: {
        fontSize: 42,
        alignSelf: 'center',
        marginBottom: 30,
        color: '#1e3a8a',
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 32,
        textAlign: 'center',
        marginVertical: 30,
        color: '#1e3a8a',
        fontFamily: 'Helvetica-Bold',
    },
    date: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
    },
});

interface CertificateProps {
    studentName: string;
    courseName: string;
    completionDate: string;
}

const CertificateDocument = ({ studentName, courseName, completionDate }: CertificateProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Certificate of Completion</Text>
            <Image src="/grad.jpg" style={styles.title} />
            <Text style={styles.text}>This is to certify that</Text>
            <Text style={styles.name}>{studentName}</Text>
            <Text style={styles.text}>
                has successfully completed the course
            </Text>
            <Text style={styles.name}>{courseName}</Text>
            <Text style={styles.date}>Completion Date: {completionDate}</Text>
        </Page>
    </Document>
);

const Certificate = ({ studentName, courseName, completionDate }: CertificateProps) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{studentName}</div>
                <div className="text-sm text-gray-500">{courseName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {completionDate}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <PDFDownloadLink
                    document={
                        <CertificateDocument
                            studentName={studentName}
                            courseName={courseName}
                            completionDate={completionDate}
                        />
                    }
                    fileName={`${courseName}-Certificate.pdf`}
                    className="inline-flex px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    {({ loading }) =>
                        loading ? 'Loading...' : 'Download'
                    }
                </PDFDownloadLink>
            </td>
        </tr>
    );
};

export default Certificate; 