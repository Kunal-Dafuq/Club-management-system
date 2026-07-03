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
    }
};