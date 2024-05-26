import { FileEarmarkPdf, FileEarmarkImage, FileEarmarkPlay, FileEarmarkWord, FileEarmark } from 'react-bootstrap-icons';

export function getFileIcon(mimeType: string) {
    switch (mimeType) {
        case 'application/pdf':
            return <FileEarmarkPdf />;
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
            return <FileEarmarkImage />;
        case 'video/mp4':
            return <FileEarmarkPlay />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return <FileEarmarkWord />;
        default:
            return <FileEarmark />;
    }
}

export function formatAddress(address: string, charsToShow = 6): string {
    if (address.length < 2 * charsToShow + 2) {
        return address;
    }

    const start = address.substring(0, charsToShow);
    const end = address.substring(address.length - charsToShow);

    return `${start}...${end}`;
}

export function downloadFile(file: File): void {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
}

export function formatFileSize(bytes: number, decimals = 2): string {
    if (bytes < 0) return 'Invalid size';  // Handle negative bytes
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = (bytes / Math.pow(k, i)).toFixed(dm);

    return `${size} ${sizes[i]}`;
}
