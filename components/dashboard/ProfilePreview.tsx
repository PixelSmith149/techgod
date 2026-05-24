interface Props {
  previewOpen: boolean;
  profileImage: string;
  closePreview: () => void;
}

export default function ProfilePreview({
  previewOpen,
  profileImage,
  closePreview,
}: Props) {

  if (!previewOpen) return null;

  return (

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
          onClick={closePreview}
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

  );

}