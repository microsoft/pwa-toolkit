/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useDebounceFn } from 'ahooks'
import {
	atom,
	SetterOrUpdater,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil'

export const currentOfflineApplicationStatus = atom({
	key: 'application-status',
	default: false,
})

export function useOfflineApplicationStatus(): [
	boolean,
	SetterOrUpdater<boolean>,
] {
	return useRecoilState(currentOfflineApplicationStatus)
}

export function useOfflineApplicationStatusValue(): boolean {
	return useRecoilValue(currentOfflineApplicationStatus)
}

export function useOfflineApplicationStatusSetter(): SetterOrUpdater<boolean> {
	return useSetRecoilState(currentOfflineApplicationStatus)
}

export const useApplicationStatusDebounced = (): [
	boolean,
	SetterOrUpdater<boolean>,
] => {
	const [offlineApplicationStatus, setOfflineStatus] = useOfflineApplicationStatus()
	const debouncedOfflineApplicationStatus = useDebounceFn(
		(newOfflineApplicationStatus: any) => setOfflineStatus(newOfflineApplicationStatus),
		{
			wait: 250,
		},
	)
	return [offlineApplicationStatus, debouncedOfflineApplicationStatus.run]
}
