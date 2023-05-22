import React from "react"
import {
  AppearanceSizeType,
  AppearanceStyleType,
  Button,
} from "@bloom-housing/doorway-ui-components"
import { ButtonGroup, ButtonGroupSpacing } from "@bloom-housing/ui-components"

type PaginationProps = {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

export function Pagination(props: PaginationProps) {
  // Max number of numbered page buttons to show
  const maxPageCount = 4
  // The number of pages we're actually going to show based on the number available
  const pagesToShow = Math.min(maxPageCount, props.lastPage)

  // Find the midpoint
  const middle = Math.floor(pagesToShow / 2)

  const pagesBefore = Math.max(
    // See how close we are to the beginning
    Math.min(
      // Are we closer to the first page?
      props.currentPage - 1,
      // Or the middle?
      middle
    ),
    // Now see how close we are to the end
    props.currentPage - props.lastPage + pagesToShow - 1,

    // No negative values
    0
  )

  // Whatever isn't on the left is on the right, except for the current page
  const pagesAfter = pagesToShow - pagesBefore - 1

  const firstPageToShow = props.currentPage - pagesBefore
  const lastPageToShow = props.currentPage + pagesAfter

  const canNavBackward = props.currentPage > 1
  const canNavForward = props.currentPage < props.lastPage
  const pageButtons = []

  for (let i = firstPageToShow; i <= lastPageToShow; i++) {
    const isCurrent = i == props.currentPage

    // only set an onclick handler if not the current page
    const onClick = isCurrent ? null : () => setPage(i)
    const styleType = isCurrent ? AppearanceStyleType.primary : null

    pageButtons.push(
      <Button size={AppearanceSizeType.small} styleType={styleType} onClick={onClick}>
        {i}
      </Button>
    )
  }

  const setPage = (page: number) => {
    props.onPageChange(page)
  }

  // border={{borderRadius: "var(--bloom-rounded-full)"}}

  return (
    <ButtonGroup
      spacing={ButtonGroupSpacing.even}
      columns={[
        <Button
          size={AppearanceSizeType.small}
          disabled={!canNavBackward}
          onClick={() => setPage(props.currentPage - 1)}
        >
          &lt;
        </Button>,
        ...pageButtons,
        <Button
          size={AppearanceSizeType.small}
          disabled={!canNavForward}
          onClick={() => setPage(props.currentPage + 1)}
        >
          &gt;
        </Button>,
      ]}
    />
  )
}
