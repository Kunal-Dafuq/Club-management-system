module.exports = (extension) => {

    switch (extension.toLowerCase()) {

        case "pdf":
            return "📕";

        case "png":
        case "jpg":
        case "jpeg":
            return "🖼";

        case "zip":
            return "🗜";

        case "ppt":
        case "pptx":
            return "📊";

        case "doc":
        case "docx":
            return "📘";

        case "xls":
        case "xlsx":
            return "📗";

        case "fig":
            return "🎨";

        case "mp4":
            return "🎥";

        default:
            return "📄";

        case "gif":
            return "🖼";

        case "webp":
            return "🖼";

        case "svg":
            return "🖼";

        case "txt":
            return "📄";

        case "csv":
            return "📊";

        case "rar":
            return "🗜";

        case "7z":
            return "🗜";

        case "mov":
        case "avi":
        case "mkv":
            return "🎥";

        case "mp3":
        case "wav":
        case "ogg":
            return "🎵";
    }
};