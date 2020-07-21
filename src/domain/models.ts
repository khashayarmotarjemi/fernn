export class Post {
  title: string;
  content: string;
  date: string;

  constructor(title: string, content: string, date: string) {
    this.title = title;
    this.content = content;
    this.date = date;
  }

  imageUrl() {
    return `/images/${this.date}.png`;
  }
}
