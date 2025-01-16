import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const AdminDashboard = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">Total Items</Typography>
          <Typography variant="h4">150</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">Low Stock Alerts</Typography>
          <Typography variant="h4">5</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">Weekly Requests</Typography>
          <Typography variant="h4">45</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default AdminDashboard;
