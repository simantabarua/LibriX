export interface BorrowType {
  book: string;
  quantity: number;
  dueDate: string;
}
export type BorrowSummary = {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};
