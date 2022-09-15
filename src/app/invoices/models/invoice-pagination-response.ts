import {Invoice} from "./invoice";

export interface InvoicePaginationResponse {
  docs: Invoice[];
  total: number;
  pages: number;
  page: number;
  limit: number;

}
