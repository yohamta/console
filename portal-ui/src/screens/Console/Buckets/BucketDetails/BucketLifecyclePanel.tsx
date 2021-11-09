// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { Button } from "@mui/material";
import get from "lodash/get";
import * as reactMoment from "react-moment";
import Grid from "@mui/material/Grid";
import { BucketInfo, LifeCycleItem } from "../types";
import { AddIcon, TiersIcon } from "../../../../icons";
import {
  actionsTray,
  searchField,
} from "../../Common/FormComponents/common/styleLibrary";
import { setErrorSnackMessage } from "../../../../actions";
import { AppState } from "../../../../store";
import { ErrorResponseHandler } from "../../../../common/types";
import api from "../../../../common/api";
import EditLifecycleConfiguration from "./EditLifecycleConfiguration";
import AddLifecycleModal from "./AddLifecycleModal";
import TableWrapper from "../../Common/TableWrapper/TableWrapper";
import HelpBox from "../../../../common/HelpBox";
import { displayComponent } from "../../../../utils/permissions";
import {
  ADMIN_LIST_TIERS,
  S3_GET_LIFECYCLE_CONFIGURATION,
  S3_PUT_LIFECYCLE_CONFIGURATION,
} from "../../../../types";
import PanelTitle from "../../Common/PanelTitle";

const styles = (theme: Theme) =>
  createStyles({
    ...searchField,
    ...actionsTray,
    twHeight: {
      minHeight: 400,
    },
  });

interface IBucketLifecyclePanelProps {
  classes: any;
  match: any;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  loadingBucket: boolean;
  bucketInfo: BucketInfo | null;
}

const BucketLifecyclePanel = ({
  classes,
  match,
  setErrorSnackMessage,
  loadingBucket,
  bucketInfo,
}: IBucketLifecyclePanelProps) => {
  const [loadingLifecycle, setLoadingLifecycle] = useState<boolean>(true);
  const [lifecycleRecords, setLifecycleRecords] = useState<LifeCycleItem[]>([]);
  const [addLifecycleOpen, setAddLifecycleOpen] = useState<boolean>(false);
  const [editLifecycleOpen, setEditLifecycleOpen] = useState<boolean>(false);

  const bucketName = match.params["bucketName"];

  const displayLifeCycleRules = displayComponent(bucketInfo?.allowedActions, [
    S3_GET_LIFECYCLE_CONFIGURATION,
  ]);

  const displayAddLifeCycleRules = displayComponent(
    bucketInfo?.allowedActions,
    [S3_PUT_LIFECYCLE_CONFIGURATION, ADMIN_LIST_TIERS],
    true
  );

  useEffect(() => {
    if (loadingBucket) {
      setLoadingLifecycle(true);
    }
  }, [loadingBucket, setLoadingLifecycle]);

  useEffect(() => {
    if (loadingLifecycle) {
      if (displayLifeCycleRules) {
        api
          .invoke("GET", `/api/v1/buckets/${bucketName}/lifecycle`)
          .then((res: any) => {
            const records = get(res, "lifecycle", []);

            setLifecycleRecords(records || []);
            setLoadingLifecycle(false);
          })
          .catch((err: ErrorResponseHandler) => {
            console.error(err);
            setLoadingLifecycle(false);
          });
      } else {
        setLoadingLifecycle(false);
      }
    }
  }, [loadingLifecycle, setLoadingLifecycle, bucketName]);

  const closeEditLCAndRefresh = (refresh: boolean) => {
    setEditLifecycleOpen(false);
    if (refresh) {
      setLoadingLifecycle(true);
    }
  };

  const closeAddLCAndRefresh = (refresh: boolean) => {
    setAddLifecycleOpen(false);
    if (refresh) {
      setLoadingLifecycle(true);
    }
  };

  const expirationRender = (expiration: any) => {
    if (expiration.days) {
      return `${expiration.days} day${expiration.days > 1 ? "s" : ""}`;
    }

    if (expiration.date === "0001-01-01T00:00:00Z") {
      return "";
    }

    return <reactMoment.default>{expiration.date}</reactMoment.default>;
  };

  const transitionRender = (transition: any) => {
    if (transition.days) {
      return `${transition.days} day${transition.days > 1 ? "s" : ""}`;
    }

    if (transition.date === "0001-01-01T00:00:00Z") {
      return "";
    }

    return <reactMoment.default>{transition.date}</reactMoment.default>;
  };

  const renderStorageClass = (objectST: any) => {
    const stClass = get(objectST, "transition.storage_class", "");

    return stClass;
  };

  const lifecycleColumns = [
    { label: "ID", elementKey: "id" },
    {
      label: "Prefix",
      elementKey: "prefix",
    },
    {
      label: "Status",
      elementKey: "status",
    },
    {
      label: "Expiration",
      elementKey: "expiration",
      renderFunction: expirationRender,
    },
    {
      label: "Transition",
      elementKey: "transition",
      renderFunction: transitionRender,
    },
    {
      label: "Storage Class",
      elementKey: "storage_class",
      renderFunction: renderStorageClass,
      renderFullObject: true,
    },
  ];

  return (
    <Fragment>
      {editLifecycleOpen && (
        <EditLifecycleConfiguration
          open={editLifecycleOpen}
          closeModalAndRefresh={closeEditLCAndRefresh}
          selectedBucket={bucketName}
          lifecycle={{
            id: "",
          }}
        />
      )}
      {addLifecycleOpen && (
        <AddLifecycleModal
          open={addLifecycleOpen}
          bucketName={bucketName}
          closeModalAndRefresh={closeAddLCAndRefresh}
        />
      )}
      <Grid container>
        <Grid item xs={12} className={classes.actionsTray}>
          <PanelTitle>Lifecycle Rules</PanelTitle>
          {displayAddLifeCycleRules && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              size="medium"
              onClick={() => {
                setAddLifecycleOpen(true);
              }}
            >
              Add Lifecycle Rule
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <TableWrapper
            itemActions={[]}
            columns={lifecycleColumns}
            isLoading={loadingLifecycle}
            records={lifecycleRecords}
            entityName="Lifecycle"
            customEmptyMessage="There are no Lifecycle rules yet"
            idField="id"
            customPaperHeight={classes.twHeight}
          />
        </Grid>
        {!loadingLifecycle && (
          <Grid item xs={12}>
            <HelpBox
              title={"Lifecycle Rules"}
              iconComponent={<TiersIcon />}
              help={
                <Fragment>
                  MinIO Object Lifecycle Management allows creating rules for
                  time or date based automatic transition or expiry of objects.
                  For object transition, MinIO automatically moves the object to
                  a configured remote storage tier.
                  <br />
                  <br />
                  You can learn more at our{" "}
                  <a
                    href="https://docs.min.io/minio/baremetal/lifecycle-management/lifecycle-management-overview.html?ref=con"
                    target="_blank"
                    rel="noreferrer"
                  >
                    documentation
                  </a>
                  .
                </Fragment>
              }
            />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

const mapState = (state: AppState) => ({
  session: state.console.session,
  loadingBucket: state.buckets.bucketDetails.loadingBucket,
  bucketInfo: state.buckets.bucketDetails.bucketInfo,
});

const connector = connect(mapState, {
  setErrorSnackMessage,
});

export default withStyles(styles)(connector(BucketLifecyclePanel));
