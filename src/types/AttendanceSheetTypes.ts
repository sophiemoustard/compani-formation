export type AttendanceSheetType = {
  _id: string,
  course: string,
  file: { publicId: string, link: string },
  date: Date,
  trainee: string,
}