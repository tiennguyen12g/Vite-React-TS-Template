import { ButtonCommon } from "@tnbt/react-favorit-style";
import { useTranslation } from "react-i18next";
import { icons } from "../icons/Icons";
const {t} = useTranslation();
const DownloadButton = <ButtonCommon icon={icons.download} iconPosition="left">{t("button.download")}</ButtonCommon>
const UploadButton = <ButtonCommon icon={icons.upload_file} iconPosition="left">{t("button.uploadFile")}</ButtonCommon>
const UploadCloudButton = <ButtonCommon icon={icons.upload_cloud} iconPosition="left">{t("button.uploadCloud")}</ButtonCommon>

export {
    DownloadButton,
    UploadButton,
    UploadCloudButton
}