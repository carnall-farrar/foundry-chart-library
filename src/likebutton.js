export class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    console.log(this.props.count);
    if (this.state.liked) {
      return "You liked this.";
    }

    return (
      <button
        onClick={() => {
          this.setState({ liked: true });
          this.props.onClick();
        }}
      >
        Like
      </button>
    );
  }
}
