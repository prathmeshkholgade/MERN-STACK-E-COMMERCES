import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function PaginationReview({ page, handlePageChange, count }) {
  return (
    <div>
      <Stack spacing={4}>
        {/* <Typography>{page}</Typography> */}
        <Pagination
          page={page}
          variant="outlined"
          onChange={handlePageChange}
          count={count}
          color="primary"
        />
      </Stack>
    </div>
  );
}
