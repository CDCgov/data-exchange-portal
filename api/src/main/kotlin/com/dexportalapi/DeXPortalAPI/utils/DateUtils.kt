import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun processDateString(inputDate: String): String? {
    try {
        // Parse the date string to a LocalDateTime object
        val parsedDate = LocalDateTime.parse(inputDate, DateTimeFormatter.ISO_DATE_TIME)

        // Convert to ISO date string without milliseconds
        val isoDateString = parsedDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))

        // Remove ":","-","." characters
        val cleanedDateString = isoDateString.replace(":", "").replace("-", "").replace(".", "")

        return cleanedDateString
    } catch (e: Exception) {
        println("Error: Invalid date format")
        return null
    }
}
