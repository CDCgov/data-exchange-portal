data class ValidationReport(
    val line: Int,
    val column: Int,
    val path: String,
    val description: String,
    val category: String,
    val classification: String
)

data class SubmissionInfo(
    val status: String,
    val stageName: String,
    val fileName: String,
    val fileSizeBytes: Long, // May be able to switch to an Int
    val bytesUploaded: Long,  // May be able to switch to an Int
    val uploadId: String,
    val uploadedBy: String,
    val timestamp: String,
    val dataStreamId: String,
    val dataStreamRoute: String
)

data class SubmissionDetails(
    val info: SubmissionInfo,
    val issues: List<String>,
    val reports: List<ValidationReport>
)
