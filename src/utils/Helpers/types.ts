export interface ParamsUrl {
  url: string;
  params?: {
    [key: string]:
      | string
      | string[]
      | number[]
      | number
      | boolean
      | null
      | undefined
      | any;
  };
}

export interface MultipartUrl {
  url: string;
  formData: FormData;
}
