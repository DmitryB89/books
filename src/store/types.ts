import {RootStateType} from './store';


export type InitialStateType = {

  books: ItemType[]
  totalItems: number
  isLoading: boolean
  error: string | null
  category: string
  sort: string
  search: string
  limit: number
}

export type VolumeInfoType = {
  title: string
  authors: string[]
  imageLinks: {
    smallThumbnail: string
  },
  categories: string[]
}

export type ItemType = {
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfoType
}

export type ResponseType = {
  kind: string
  items: ItemType[]
  totalItems: number
}


export type ThunkAPIType = {
  rejectValue: string
  state: RootStateType
}