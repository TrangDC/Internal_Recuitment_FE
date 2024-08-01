import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import { Fragment } from 'react/jsx-runtime'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppTextField from 'shared/components/input-fields/AppTextField'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AppButton from 'shared/components/buttons/AppButton'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import ExPoint from 'shared/components/icons/ExPoint'
import { Span, Tiny } from 'shared/components/Typography'
import Add from 'shared/components/icons/Add'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import ApproveAutoComplete from 'shared/components/autocomplete/approve-auto-complete'
import Tooltip from 'shared/components/tooltip'
import { isEmpty } from 'lodash'
import { RULE_MESSAGES } from 'shared/constants/validate'
import useCreateHiringTeam from 'features/hiring-team/hooks/crud/useCreateHiringTeam'
import { ButtonAdd } from 'features/hiring-team/shared/constants/styles/style'
interface ICreateTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateTeamModal({ open, setOpen }: ICreateTeamModal) {
  const { onSubmit, control, isPending, isValid, formState, actions, state } =
    useCreateHiringTeam({
      callbackSuccess: () => {
        setOpen(false)
      },
    })

  const { approve_list } = state
  const { addApprove, delApprove, onChangeApprove } = actions
  const translation = useTextTranslation()

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Add a new hiring team"
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2}>
            <FlexBox
              justifyContent={'center'}
              alignItems={'center'}
              marginTop={1}
            >
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'Name'}
                        required
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            </FlexBox>

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="members"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <MemberAutoComplete
                        value={field.value || []}
                        onChange={field.onChange}
                        multiple={true}
                        name={field.name}
                        textFieldProps={{
                          label: `Team's Manager`,
                          required: true,
                        }}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
                  )}
                />
              </FormControl>
            </FlexBox>

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="approvers"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <FlexBox gap={2} flexDirection={'column'}>
                        {approve_list.map((approve, idx) => {
                          //@ts-ignore
                          const error_msg = !isEmpty(fieldState?.error?.[idx])
                            ? RULE_MESSAGES.MC1(`Approve ${idx + 1}`)
                            : ''

                          const disabled_del =
                            idx === 0 && approve_list.length <= 1
                          const styled_btn = disabled_del
                            ? {
                                fontSize: '24px',
                                cursor: 'not-allowed',
                                '& path': { fill: '#BABFC5' },
                              }
                            : { fontSize: '24px' }

                          //list user in selected
                          const list_disabled = approve_list.reduce(
                            (current: string[], next) => {
                              if (next.user_id !== approve.user_id)
                                current.push(next.user_id)

                              return current
                            },
                            []
                          )

                          return (
                            <FlexBox width={'100%'} flexDirection={'column'}>
                              <FlexBox
                                gap={2}
                                alignItems={'center'}
                                key={approve.uid}
                                width={'100%'}
                              >
                                <Box sx={{ flex: 1 }}>
                                  <ApproveAutoComplete
                                    value={approve.user_id}
                                    onChange={(value) => {
                                      onChangeApprove(approve.uid, value ?? '')
                                    }}
                                    list_disabled={list_disabled}
                                    multiple={false}
                                    name={field.name}
                                    textFieldProps={{
                                      label: (
                                        <FlexBox gap={1} alignItems={'center'}>
                                          <Tiny
                                            fontWeight={500}
                                            color={'#4D607A'}
                                            lineHeight={'21px'}
                                          >
                                            Approve {idx + 1}
                                          </Tiny>
                                          <Span sx={{ color: '#DB6C56' }}>
                                            *
                                          </Span>
                                          <Tooltip title="Approvals for the job vacancy request will require the team's approvers.">
                                            <ExPoint />
                                          </Tooltip>
                                        </FlexBox>
                                      ),
                                    }}
                                  />
                                </Box>
                                <DeleteIcon
                                  sx={styled_btn}
                                  onClick={() =>
                                    approve_list.length > 1 &&
                                    delApprove(approve.uid)
                                  }
                                />
                              </FlexBox>
                              <HelperTextForm
                                message={error_msg}
                              ></HelperTextForm>
                            </FlexBox>
                          )
                        })}
                      </FlexBox>
                      {/* <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm> */}
                    </Fragment>
                  )}
                />
              </FormControl>
            </FlexBox>

            <FlexBox gap={1} flexDirection={'column'}>
              <Box>
                <ButtonAdd
                  variant="outlined"
                  size="small"
                  type="button"
                  onClick={addApprove}
                >
                  <Add /> Add approver
                </ButtonAdd>
              </Box>
              {approve_list.length > 1 && (
                <Tiny>
                  A new job vacancy requires sequential approval from designated
                  approvers. For instance, a Developer vacancy request needs
                  approval from Approver 1 first, followed by Approver 2.
                </Tiny>
              )}
            </FlexBox>

            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'Description'}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        multiline
                        minRows={4}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            </FlexBox>
          </FlexBox>
        </BaseModal.ContentMain>
        <BaseModal.Footer>
          <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
            <AppButton
              variant="outlined"
              size="small"
              onClick={() => setOpen(false)}
            >
              {translation.COMMON.cancel}
            </AppButton>
            <ButtonLoading
              variant="contained"
              size="small"
              disabled={isValid}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonLoading>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default CreateTeamModal
