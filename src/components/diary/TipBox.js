import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function TipBox(props) {
  return (
    <Card>
      <Box p={3}>
        <Box p={2}>
          <Typography gutterBottom variant="h5" component="h2">
            Tip
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.content}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            - National Sleep Foundation
          </Typography>
        </Box>
        <Box align={"right"}>
          <Button size="small" color="primary" onClick={props.onSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
