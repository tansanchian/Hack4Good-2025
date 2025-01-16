import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const ReportsPage = () => {
  // Sample data for charts
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Weekly Requests",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Weekly Requests</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Inventory Summary</Typography>
            <Typography>Coming soon...</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ReportsPage;
