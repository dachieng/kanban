import { ChevronRight } from "lucide-react";

const breadcrumbs = ["Dashboard", "Kanban"];

const KanbanHeader = () => {
  return (
    <header className="flex flex-col gap-spacing-xs">
      <h1 className="text-xl leading-xl font-semibold text-secondary-900">
        Kanban
      </h1>
      <nav className="flex items-center gap-spacing-xs text-sm leading-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb} className="flex items-center gap-spacing-xs">
            {index > 0 && (
              <ChevronRight className="size-4 text-secondary-400" />
            )}
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "font-medium text-secondary-900"
                  : "text-secondary-500"
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>
    </header>
  );
};

export default KanbanHeader;
