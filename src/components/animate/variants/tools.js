import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import LinearProgress from "@mui/material/LinearProgress";
import TableContainer from "@mui/material/TableContainer";
import ClippedDrawerLayout from "layout/main";
import { useSWRWithAuth } from "hooks/swr";
import { definitions } from "types/schemas";
import { TextField, Tooltip } from "@mui/material";

import EmailAutoComplete from "components/EmailAutoComplete";
import OpsGenieAutocomplete from "components/OpsGenieAutoComplete";
import { useForm, Controller } from "react-hook-form";
import useSlackClient from "hooks/useSlackClient";
import { useAuth } from "context/Auth";
import { useSnackbar } from "notistack";
import SlackGroupsAutoComplete from "components/SlackGroupsAutoComplete";

type IRoutingRule = definitions["RoutingRule"];

interface IRoutingRuleModalProps {
  isCreate: boolean;
  routingRule?: RoutingRuleRecord;
  handleClose: () => void;
}

export type OpsGenieTeam = definitions["OpsgenieTeam"];
export type OpsGenieTeamResponse = {
  teams: Array<OpsGenieTeam>;
};

// Routing Rule Model component

const RoutingRuleModal: React.FC<IRoutingRuleModalProps> = (props) => {
  const { routingRule, handleClose, isCreate } = props;
  const { register, handleSubmit, control } = useForm({
    defaultValues: routingRule || {},
  });
  const { workspaces, groups } = useSlackClient("");
  const { headers } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { data: opsgenie, error } = useSWRWithAuth<OpsGenieTeamResponse>(
    "/api/v2/opsgenie/teams"
  );
  const teams = opsgenie?.teams || [];
  if (!teams || error) {
    return null;
  }

  const handleSaveRoutingRule = async (rule: RoutingRuleRecord) => {
    // reconstruct opsgenie team names/ids
    const slackGroups: Array<{ id: string; name: string }> = [];
    const groupIds: Record<string, boolean> = {};
    rule.slackGroupsList?.forEach((sg) => {
      if (!groupIds[sg.id]) {
        slackGroups.push(sg);
      }
      groupIds[sg.id] = true;
    });
    rule.slackGroupsList = slackGroups;

    if (isCreate) {
      const res = await fetch(`/api/v2/routing/rules`, {
        method: "POST",
        body: JSON.stringify({
          ...rule,
          isDefault: false,
          isActive: true,
        }),
        headers,
      });
      if (!res.ok) {
        // replace with toast
        enqueueSnackbar("Failed to create routing rule");
        return;
      }
      handleClose();
      return;
    }

    const res = await fetch(`/api/v2/routing/rules/${rule.id}`, {
      method: "PUT",
      body: JSON.stringify(rule),
      headers,
    });
    if (!res.ok) {
      enqueueSnackbar("Failed to update routing rule");
      return;
    }
    handleClose();
  };

  const isNewRoutingRule = !routingRule && isCreate;
  return (
    <Dialog
      open={!!routingRule || isNewRoutingRule}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <form noValidate onSubmit={handleSubmit(handleSaveRoutingRule)}>
        <DialogContent>
          <DialogTitle id="form-dialog-title">
            {isNewRoutingRule ? "Create" : "Edit"} Routing Rule
          </DialogTitle>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                id="routing-name"
                label="Routing Rule Name"
                variant="outlined"
                fullWidth
                {...register("name")}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Controller
                control={control}
                name="slackWorkspaces"
                render={({ field }) => (
                  <TextField
                    id="select"
                    select
                    fullWidth
                    label="Slack Workspace"
                    value={field.value}
                    onChange={(e) => field.onChange([e.target.value])}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {workspaces.map((ws) => (
                      <MenuItem key={ws.id} value={ws.id}>
                        {ws.name ?? ws.id}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid container item sm={2} xs={12} alignItems="center">
              <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="slackIsPrivate"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                        checked={field.value}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Private Slack"
              />
            </Grid>

            <Grid item sm={5} xs={12}>
              <Controller
                control={control}
                name="slackRecipientsList"
                render={({ field }) => (
                  <EmailAutoComplete
                    id="slack-recipients"
                    label="Slack Users"
                    values={field.value || []}
                    onChange={(_e, v) => field.onChange(v)}
                  />
                )}
              />
            </Grid>
            <Grid item sm={5} xs={12}>
              <Controller
                control={control}
                name="slackGroupsList"
                render={({ field }) => (
                  <SlackGroupsAutoComplete
                    id="slack-groups"
                    label="Slack Groups"
                    values={field.value || []}
                    options={groups || []}
                    onChange={(e, v) => field.onChange(v)}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Controller
                control={control}
                name="opsGenieTeams"
                render={({ field }) => (
                  <OpsGenieAutocomplete
                    id="opsgenie-teams"
                    label="OpsGenie teams to page on triage"
                    values={field.value || []}
                    options={teams.map((t) => ({
                      label: t.name,
                      value: t.id,
                    }))}
                    onChange={(e, v) => {
                      field.onChange(v);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Controller
                control={control}
                name="emailRecipientsList"
                render={({ field }) => (
                  <EmailAutoComplete
                    id="email-recipients"
                    label="Email Recipients"
                    values={field.value || []}
                    onChange={(e, v) => field.onChange(v)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                multiline
                id="routing-description"
                label="Description"
                variant="outlined"
                {...register("description")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

interface RoutingRuleRecord extends IRoutingRule {
  opsGenieTeams: Array<{
    label: string;
    value: string;
  }>;
}

interface IRow {
  routingRule: RoutingRuleRecord;
  onEdit: (routingRule: RoutingRuleRecord) => void;
  onToggle: () => void;
}

type ListSummaryProps = {
  list: Array<string> | undefined;
  label: string;
};
const ListSummary: React.FC<ListSummaryProps> = ({ list, label }) => {
  if (!list || list.length === 0) {
    return <em>Not set</em>;
  }
  return (
    <Tooltip
      title={
        <Typography fontSize="11px">
          {list?.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </Typography>
      }
    >
      <Typography display="inline">
        {list?.length || 0} {label}
        {list?.length !== 1 ? "s" : ""}
      </Typography>
    </Tooltip>
  );
};

// Row component

const Row: React.FC<IRow> = (props) => {
  const { routingRule, onEdit, onToggle } = props;
  const {
    name,
    slackIsPrivate,
    slackWorkspaces,
    slackRecipientsList,
    slackGroupsList,
    emailRecipientsList,
    opsGenieTeams,
    description,
  } = routingRule;
  const { headers } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { workspaces } = useSlackClient("");

  const handleDisable = async () => {
    const res = await fetch(`/api/v2/routing/rules/${routingRule.id}/toggle`, {
      method: "PUT",
      headers,
    });
    if (!res.ok) {
      // replace with toast
      console.error("could not toggle data");
      return;
    }
    onToggle();
  };

  const handleDelete = async () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this routing rule?"
    );
    if (!isConfirmed) return;
    const res = await fetch(`/api/v2/routing/rules/${routingRule.id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) {
      const text = (await res.json()) as { message: string };
      enqueueSnackbar(text.message, { variant: "error" });
      // replace with toast
      console.error("could not delete data");
      return;
    }
    onToggle();
  };

  const handleEnable = async () => {
    const payload: IRoutingRule = {
      ...routingRule,
      description: description ?? "",
      isActive: true,
    };

    const res = await fetch(`/api/v2/routing/rules/${routingRule.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers,
    });
    if (!res.ok) {
      // replace with toast
      console.error("could not save data");
      return;
    }
    onToggle();
  };

  const style = !routingRule.isActive ? { opacity: 0.5 } : {};

  const workspaceNames = slackWorkspaces?.map(
    (w) => workspaces.find((x) => x.id === w)?.name || ""
  );
  return (
    <TableRow style={style}>
      <TableCell>
        <Typography noWrap style={{ maxWidth: 200, fontWeight: "bold" }}>
          {name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="button" color="textSecondary">
          {slackIsPrivate ? "Yes" : "No"}
        </Typography>
      </TableCell>
      <TableCell>{workspaceNames}</TableCell>
      <TableCell>
        <ListSummary list={slackRecipientsList} label="User" />
        {", "}
        <ListSummary list={slackGroupsList?.map((i) => i.name)} label="Group" />
      </TableCell>
      <TableCell>
        <ListSummary list={emailRecipientsList} label="User" />
      </TableCell>
      <TableCell>
        <ListSummary
          list={opsGenieTeams.map((team) => team.label)}
          label="Team"
        />
      </TableCell>
      <TableCell>
        <Typography style={{ maxWidth: 200 }}>{description}</Typography>
      </TableCell>
      <TableCell>
        {routingRule.isActive ? (
          <ButtonGroup size="small" variant="text">
            <Button onClick={() => onEdit(routingRule)}>Edit</Button>
            <Button color="warning" onClick={handleDisable}>
              Disable
            </Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            size="small"
            className="fs-0_75"
            color="success"
            variant="outlined"
            onClick={handleEnable}
          >
            Enable
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

// Print all Routing Rules

const RoutingRules = () => {
  const { data, loading, mutate } = useSWRWithAuth<{
    routes: Array<IRoutingRule>;
  }>(`/api/v2/routing/rules`, { revalidateOnFocus: false });
  const [routingRuleToEdit, setRoutingRuleToEdit] = useState<
    RoutingRuleRecord | undefined
  >();
  const [createNewRoutingRule, setCreateNewRoutingRule] = useState(false);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h1">Routing Rules</Typography>
        </Grid>
        <Grid container item xs={4} direction="row-reverse">
          <Button
            onClick={() => setCreateNewRoutingRule(true)}
            variant="contained"
            color="primary"
          >
            + Add Routing Rule
          </Button>
        </Grid>
      </Grid>

      <TableContainer className="mt-25">
        <Table size="small" data-testid="routing-rules-table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="button" display="inline">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button" display="inline">
                  Slack Private
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button" display="inline">
                  Slack Workspace
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button" display="block">
                  Auto-add to Slack
                </Typography>
                <Typography variant="button" display="inline">
                  (Users & Groups)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button" display="inline">
                  Email Recipients
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button" display="inline">
                  OpsGenie Teams
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button" display="inline">
                  Description
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LinearProgress style={{ width: "100%" }} />
            ) : (
              data?.routes.map((rule) => (
                <Row
                  key={rule.id || 0}
                  routingRule={{
                    ...rule,
                    opsGenieTeams:
                      rule.opsGenieTeamList?.map((name, idx) => ({
                        value: rule.opsGenieTeamIDList?.[idx] || "",
                        label: name,
                      })) || [],
                  }}
                  onEdit={(r) => setRoutingRuleToEdit(r)}
                  onToggle={() => mutate()}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {(routingRuleToEdit || createNewRoutingRule) && (
        <RoutingRuleModal
          isCreate={createNewRoutingRule}
          routingRule={routingRuleToEdit}
          handleClose={() => {
            mutate();
            setRoutingRuleToEdit(undefined);
            setCreateNewRoutingRule(false);
          }}
        />
      )}
    </Container>
  );
};

RoutingRules.getLayout = function getLayout(page: React.ReactNode) {
  return <ClippedDrawerLayout>{page}</ClippedDrawerLayout>;
};

export default RoutingRules;
