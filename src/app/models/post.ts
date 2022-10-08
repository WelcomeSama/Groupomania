export class Post {
  _id!: string;
  title!: string;
  imageUrl!: string;
  userId!: string;
  username: string;
}

export class PostList {
  post: Post;
  isEditing: boolean;
}