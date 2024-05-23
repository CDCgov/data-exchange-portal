// These models are likely unnecessary since ApolloClient will generate models automatically based on queries/schema
package dexportal.models.psApi

data class FileSubmissionsSummary(
    val numberOfPages: Int,
    val pageNumber: Int,
    val pageSize: Int,
    val totalItems: Int
)

data class FileSubmission(
    val uploadId: String,
    val filename: String,
    val status: String,
    val timestamp: String,
    val dataStreamId: String,
    val dataStreamRoute: String
)

data class FileSubmissions(
    val summary: FileSubmissionsSummary,
    val items: List<FileSubmission>
)
