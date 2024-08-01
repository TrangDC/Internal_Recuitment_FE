import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import { Fragment } from 'react/jsx-runtime'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useUpdateTeam from 'features/teams/hooks/crud/useUpdateTeam'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import Add from 'shared/components/icons/Add'
import { Span, Tiny } from 'shared/components/Typography'
import ApproveAutoComplete from 'shared/components/autocomplete/approve-auto-complete'
import ExPoint from 'shared/components/icons/ExPoint'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { ButtonAdd } from 'features/teams/shared/constants/styles/style'
import TooltipComponent from 'shared/components/tooltip'

interface IEditTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function EditTeamModal({ open, setOpen, id }: IEditTeamModal) {
  const {
    actions,
    control,
    isValid,
    isPending,
    setValue,
    isGetting,
    formState,
    state,
  } = useUpdateTeam({
    id: id,
    onSuccess: () => {
      setOpen(false)
    },
  })
  const { onSubmit, addApprove, delApprove, onChangeApprove } = actions
  const { approve_list } = state;

  const translation = useTextTranslation()

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Edit hiring team"
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
                  render={({ field, fieldState }) => {
                    return (
                      <FlexBox alignItems={'center'} flexDirection={'column'}>
                        <AppTextField
                          label={'Name'}
                          required
                          size="small"
                          fullWidth
                          value={field.value}
                          onChange={field.onChange}
                          loading={isGetting}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )
                  }}
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
                        {approve_list?.map((approve, idx) => {
                          const disabled_del = idx === 0 && approve_list.length <= 1;
                          const styled_btn = disabled_del ? { fontSize: '24px', cursor: 'not-allowed', '& path': { fill: '#BABFC5'}} : { fontSize: '24px'}

                          //list user in selected
                          const list_disabled = approve_list.reduce((current: string[], next) => {
                            if(next.user_id !== approve.user_id) current.push(next.user_id);

                            return current;
                          }, [])

                          return (
                            <FlexBox gap={2} alignItems={'center'} key={approve.uid}>
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
                                        <Span sx={{ color: '#DB6C56' }}>*</Span>
                                        <TooltipComponent title="Approvals for the job vacancy request will require the team's approvers.">
                                          <ExPoint />
                                        </TooltipComponent>
                                      </FlexBox>
                                    ),
                                  }}
                                />
                              </Box>
                              <DeleteIcon
                                sx={styled_btn}
                                onClick={() => approve_list.length > 1 && delApprove(approve.uid)}
                              />
                            </FlexBox>
                          )
                        })}
                      </FlexBox>
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
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
              {approve_list?.length > 1 &&  <Tiny>
                A new job vacancy requires sequential approval from designated
                approvers. For instance, a Developer vacancy request needs
                approval from Approver 1 first, followed by Approver 2.
              </Tiny>}
             
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
                        loading={isGetting}
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
            <ButtonEdit
              disabled={isValid}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonEdit>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default EditTeamModal
