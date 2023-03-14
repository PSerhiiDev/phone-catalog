export type Product = {
  age: number;
  capacity: string;
  discount: number;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  ram: string;
  screen: string;
  snippet: string;
  type: string;
};

export interface PropertyByCategory {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
}

interface Android {
  os: string;
  ui: string;
}

interface Battery {
  standbyTime: string;
  talkTime: string;
  type: string;
}

interface Camera {
  features: string[];
  primary: string;
}

interface Connectivity {
  bluetooth: string;
  cell: string;
  gps: boolean;
  infrared: boolean;
  wifi: string;
}

interface Display {
  screenResolution: string;
  screenSize: string;
  touchScreen: boolean;
}

interface Hardware {
  accelerometer: boolean;
  audioJack: string;
  cpu: string;
  fmRadio: boolean;
  physicalKeyboard: boolean;
  usb: string;
}

interface SizeAndWeight {
  dimensions: string[];
  weight: string;
}

interface Storage {
  flash: string;
  ram: string;
}

export interface ProductDetails {
  additionalFeatures: string;
  android: Android;
  availability: string[];
  battery: Battery;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardware;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: SizeAndWeight;
  storage: Storage;
}
