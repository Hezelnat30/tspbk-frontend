interface MediaResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  format: string;
  resource_type: string;
  created_at: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
}

interface IFileURL {
  fileUrl: string;
}

export type { IFileURL, MediaResponse };
