export interface LineOfBusiness {
  id: number;
  name: string;
  description: string;
  quoteCount: number;
}

export interface Quote {
  id: number,
  quoteNumber: string;
  lineOfBusiness: number;
}
