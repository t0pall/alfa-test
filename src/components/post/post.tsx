import { type FC } from "react"
import styles from "./post.module.css"
import { type TPost } from "../../features/posts/post"
import {
  useDeleteCardMutation,
  useSetReactionMutation,
} from "../../features/posts/postsApiSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../loader/spinner/spinner"

interface PostProps {
  post: TPost
  userId: string
}

const Post: FC<PostProps> = ({
  post: { avatar, description, id, name, reactions },
  userId,
}) => {
  const navigate = useNavigate()

  const [setReaction, { isLoading: isReactionLoading }] =
    useSetReactionMutation()
  const [deleteCard, { isLoading: isDeleteLoading }] = useDeleteCardMutation()

  const handleSetReaction = (id: string, reactions: string[]) => {
    if (reactions.includes(userId)) {
      setReaction({
        id,
        reactions: reactions.filter(reaction => reaction !== userId),
      })
    } else {
      setReaction({ id, reactions: [...reactions, userId] })
    }
  }

  return (
    <article onClick={() => navigate(id)} key={id} className={styles.post}>
      <div className={styles.nameWrapper}>
        <img className={styles.avatar} src={avatar} alt={name} />
        <h3 className={styles.name}>{name}</h3>
      </div>
      <p className={styles.description}>
        {description.length > 170
          ? description.substring(0, 170) + "..."
          : description.substring(0, 170)}
      </p>
      <div className={styles.buttonsContainer}>
        <button
          onClick={e => {
            deleteCard(id)
            e.stopPropagation()
          }}
          style={{
            backgroundSize: isDeleteLoading ? 0 : "transparent",
          }}
          className={styles.deleteButton}
        >
          {isDeleteLoading && <Spinner size={15} />}
        </button>

        <button
          onClick={e => {
            handleSetReaction(id, reactions)
            e.stopPropagation()
          }}
          className={styles.likeButton}
          style={{
            filter: reactions.includes(userId) ? "none" : "opacity(50%)",
          }}
        >
          {isReactionLoading ? <Spinner size={8} /> : reactions.length}
        </button>
      </div>
    </article>
  )
}

export default Post
