export type IFileSubmission = {
  readonly tus_upload_id: string;
  readonly file_name: string;
  readonly status: string;
  readonly timestamp: string;
};
