interface Props {
  profileImage: string;
  onClose: () => void;
}


    export default function ProfilePreview({ profileImage, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white"
      >
        Close
      </button>

      <img
        src={profileImage}
        className="max-h-[80vh] rounded-2xl"
      />

    </div>
    );


    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/90
        p-5
      "
    >

      <div className="relative">

        <button
          onClick={onClose}
          className="
            absolute -right-3 -top-3
            rounded-full
            bg-white
            px-3 py-1
            text-black
          "
        >
          ✕
        </button>

        <img
          src={
            profileImage ||
            "/default-profile.png"
          }
          alt="preview"
          className="
            max-h-[85vh]
            rounded-4xl
          "
        />

      </div>

    </div>


}