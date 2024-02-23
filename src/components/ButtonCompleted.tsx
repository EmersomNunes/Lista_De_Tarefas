type Props = {
    onClick: () => void
}
export const ButtonCompleted= ({ onClick }: Props) => {
    return(
      <button
        onClick={onClick}
        className="underline-hidden hover:text-blue-500 hover:underline-offset-4 hover:underline"
      >
        Completed
      </button>
    );
}