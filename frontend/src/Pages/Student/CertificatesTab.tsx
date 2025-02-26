import { FC } from "react";
import Certificate from "./Certificate";

interface CertificatesTabProps {
    certificates: any[];
    username: string;
}


const CertificatesTab: FC<CertificatesTabProps> = ({ certificates, username }) => {
    console.log(certificates)
    return (
        <>
            {true ? (
                <div className="grid grid-cols-1 gap-6">
                     <table className="min-w-full overflow-x-auto border border-gray-200 divide-y divide-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    ToDownload
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {certificates.map((certificate) => (
                            <Certificate key={crypto.randomUUID()} studentName={username} courseName={certificate.courseName} completionDate={new Date(certificate.completionDate).toLocaleDateString()} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No certificates found.</p>
            )}
        </>
    );
};

export default CertificatesTab;
