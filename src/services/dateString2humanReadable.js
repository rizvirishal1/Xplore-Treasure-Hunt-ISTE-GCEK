const dateString2humanReadable = (dateString) => {
    console.log("\n\n")
    console.log("dateString2humanReadable function is running...")
    console.log("Recieved Argument:")
    console.log("dateString:")
    console.log(dateString)
    if (!dateString) return "";
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    const date = new Date(dateString);

    console.log("function end")
    console.log("\n\n");
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default dateString2humanReadable;