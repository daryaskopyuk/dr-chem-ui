export interface PlaceholderGeo {
  lat: string;
  lng: string;
}

export interface PlaceholderAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: PlaceholderGeo;
}

export interface PlaceholderCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: PlaceholderAddress;
  phone: string;
  website: string;
  company: PlaceholderCompany;
}
