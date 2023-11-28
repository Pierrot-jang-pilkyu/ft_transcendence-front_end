import styles from "./ChangeModal.module.css";
import socket from "../../../hooks/socket/socket";

function ChangeModal({ onClose }) {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      console.log("Here");
      onClose();
    }
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div className={`${styles.popup_wrap}`} onClick={handleOutsideClick}>
      <div className={`${styles.popup}`}>
        <div className={`${styles.logo}`}>프로필 정보 변경</div>
        <div className={`${styles.logoline}`} />
        <div className={`${styles.avatar_container}`}>
          {/* <input type="file" className="file-input file-input-ghost" /> */}
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Choose Avatar
            </label>
            <input
              id="picture"
              type="file"
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
            />
          </div>
          <div className={`${styles.form__group}`}>
            <input
              type="input"
              className={`${styles.form__field}`}
              placeholder="Name"
            />
            <label className={`${styles.form__label}`}>Name</label>
          </div>
        </div>
        <div className={`${styles.button_container}`}>
          <button className={`${styles.button_close}`} onClick={handleClose}>
            닫기
          </button>
          <button className={`${styles.button_accept}`}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default ChangeModal;
