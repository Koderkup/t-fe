import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  Button,
  PageContainer,
  PageInfo,
  SimpleCell,
  Typography,
} from "@/components";
import NewsletterImage from "@/pages/newsletter/newsletters-page/components/newsletter-image.tsx";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { formatDate } from "@/utils/date-fns.ts";
import {
  NEWSLETTER_PAST_DATE_FORMAT,
  NEWSLETTER_TODAY_DATE_FORMAT,
} from "@/shared/constants.ts";
import { Message } from "@/shared/types/message.interface";
import { cn } from "@/utils/twMerge";
import SuccessModal from "@/components/ui/modals/success-modal/success-modal";
import { useMainStore } from "@/store/main-store";

interface NewslettersListProps {
  messages: Array<Message>;
}

const NewslettersList: FC<NewslettersListProps> = ({ messages }) => {
  const navigate = useNavigate();
  const [toggleSuccesModal, isSuccesModalOpen] = useMainStore(state => [
    state.toggleSuccesModal,
    state.isSuccesModalOpen,
  ]);
  const { t } = useTranslation("newsletter");

  return (
    <>
      <PageContainer className="relative h-screen overflow-hidden">
        <div className="flex h-full flex-col overflow-hidden">
          <PageInfo
            title={t("newsletter-history.title")}
            description={t("newsletter-history.description")}
          />

          <div className="mb-4 mt-4 overflow-auto">
            {messages.map((elem, idx) => {
              const format = isToday(elem.createdAt)
                ? NEWSLETTER_TODAY_DATE_FORMAT
                : NEWSLETTER_PAST_DATE_FORMAT;

              const formatedDate = formatDate(new Date(elem.createdAt), format);

              return (
                <SimpleCell
                  key={elem.id}
                  before={<NewsletterImage imageUrl={elem.mediaUrl || ""} />}
                  after={
                    <Typography variant="body-sm" color="black_60">
                      {formatedDate}
                    </Typography>
                  }
                  title={
                    <Typography
                      variant="body-md"
                      className={cn("font-medium", {
                        "!text-[#FF3B30]": elem.status === "Pending",
                      })}
                    >
                      {elem.status === "Sent"
                        ? t("newsletter-history.status.sent")
                        : t("newsletter-history.status.pending")}
                    </Typography>
                  }
                  description={elem.message}
                  showBorderBottom={idx !== messages.length - 1}
                  onClick={() =>
                    navigate(`${RoutesPaths.NEWSLETTERS}/${elem.id}`)
                  }
                />
              );
            })}
          </div>

          <Button
            className="mt-auto"
            onClick={() => navigate(RoutesPaths.CREATE_NEWSLETTER)}
          >
            {t("newsletter-history.button-text")}
          </Button>
        </div>
      </PageContainer>

      <SuccessModal
        showModal={isSuccesModalOpen}
        onClose={() => toggleSuccesModal(false)}
      />
    </>
  );
};

export default NewslettersList;
